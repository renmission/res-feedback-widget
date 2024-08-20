import React from 'react';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { projects as dbProjects } from '@/db/schema';
import Link from 'next/link';
import { ChevronLeft, Code2, Globe } from 'lucide-react';
import Table from '@/components/table';

type ProjectWithFeedbacks = {
  id: number;
  name: string | null;
  description: string | null;
  url: string | null;
  userId: string | null;
  feedbacks: {
    id: number;
    projectId: number | null;
    userName: string | null;
    userEmail: string | null;
    message: string | null;
    rating: number | null;
  }[];
};

const page = async ({ params }: { params: { projectId: string } }) => {
  if (!params.projectId) return <p>Invalid Project ID</p>;

  const projects: ProjectWithFeedbacks[] = await db.query.projects.findMany({
    where: eq(dbProjects.id, parseInt(params.projectId)),
    with: { feedbacks: true },
  });

  const project = projects[0];

  console.log(project);

  return (
    <div>
      <div>
        <Link href='/dashboard' className='flex items-center mb-5'>
          <ChevronLeft className='h-4 w4' />
          <span className='text-md'>Back to projects</span>
        </Link>
      </div>
      <div className='w-full max-w-screen-xl flex flex-col justify-between items-start'>
        <h1 className='text-3xl font-bold mb-3'>{project.name}</h1>
        <p className='text-slate-700 mb-4'>{project.description}</p>
        {project.url ? (
          <Link href={project.url} className='flex underline items-center mb-2'>
            <Globe className='h-5 w-5 mr-2' />
            <span>Visit Site</span>
          </Link>
        ) : null}
        <Link
          href={`/projects/${params.projectId}/instructions`}
          className='flex underline items-center mb-2'
        >
          <Code2 className='h-5 w-5 mr-2' />
          <span>Embed Code</span>
        </Link>
      </div>
      <div>
        {project.feedbacks.length > 0 ? (
          <Table data={project.feedbacks} />
        ) : (
          <p className='text-slate-500 mt-5'>
            No feedbacks available for this project.
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
