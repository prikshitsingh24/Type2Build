import { NextResponse } from 'next/server';
import { exec as execCb } from 'child_process';
import archiver from 'archiver';
import fs from 'fs-extra';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { promisify } from 'util';

const prisma = new PrismaClient();
const exec = promisify(execCb);

const createNextJsProject = async (projectPath: string): Promise<void> => {
    try {
      console.log('Starting the Next.js project creation...');
      
      // Run the command and wait for completion
      const { stdout, stderr } = await exec(`npx create-next-app@latest ${projectPath} --typescript --eslint --use-npm --app --src-dir --no-tailwind --import-alias "@/*" --no-experimental-app --no-install`);

      const nodeModulesPath = path.join(projectPath, 'node_modules');
      await fs.remove(nodeModulesPath);
      // Log stdout and stderr
      if (stdout) console.log('Next.js project creation stdout:', stdout);
      if (stderr) console.log('Next.js project creation stderr:', stderr);
      
      console.log('Next.js project creation completed');
    } catch (err:any) {
      console.error('Error creating Next.js project:', err.message || err);
      throw err;
    }
  };

const zipDirectory = (sourceDir: string, outPath: string): Promise<void> => {
  const archive = archiver('zip', { zlib: { level: 1 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err: any) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
};

export async function POST(req: Request) {
  const { projectId } = await req.json();
  console.log('running....', projectId);

  const projectPath = path.join(process.cwd(), 'nextjs-app-temp');
  const zipPath = path.join(process.cwd(), 'nextjs-app.zip');

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project?.frontendDev) {
      return NextResponse.json({ message: 'Could not find any project with the id' });
    }

    await createNextJsProject(projectPath);

    console.log('Project successfully created.');

    const customCode = `
      export default function Home() {
        return(
        ${project.frontendDev};
      )}
    `;
    // Ensure the 'app' directory exists in the 'src' folder
    const appDir = path.join(projectPath, 'src', 'app');
    fs.ensureDirSync(appDir); // Creates the 'src/app' directory if it doesn't exist

    // Write the custom code to 'src/app/page.tsx'
    fs.writeFileSync(path.join(appDir, 'page.tsx'), customCode);

    try {
        // Zip the directory
        await zipDirectory(projectPath, zipPath);
      } catch (error) {
        console.error('Failed to zip the directory:', error);
        return NextResponse.json({ message: 'Error zipping the project' }, { status: 500 });
      }
    console.log("created a zip file...")
    console.log("reading starts....")
    const fileBuffer = fs.readFileSync(zipPath);

    // Clean up
    fs.removeSync(projectPath);
    fs.removeSync(zipPath);

    // Return file for download
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=nextjs-app.zip',
      },
    });
  } catch (error) {
    console.error('Error building and zipping the project:', error);
    return NextResponse.json({ message: 'Failed to create project' }, { status: 500 });
  }
}
