import React from 'react';
import CopyButton from '@/components/copy-button';

const page = ({ params }: { params: { projectId: string } }) => {
  if (!params.projectId) return <div>Invalid Project ID</div>;
  if (!process.env.WIDGET_URL) return <div>Missing Widget Url</div>;

  return (
    <div className='w-full max-w-screen-xl'>
      <h1 className='text-2xl font-bold mb-2'>Start Collecting Feedback</h1>
      <p className='text-lg text-neutral-700 mb-4'>
        Embed the code in your site.
      </p>
      <div className='bg-slate-800 p-6 rounded-lg shadow-inner border border-slate-900  relative'>
        <code className='text-slate-200 flex flex-col'>
          <span>{`<my-widget project-id="${params.projectId}"></my-widget>`}</span>
          <span>{`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}</span>
        </code>
        <CopyButton
          text={`<my-widget project="${params.projectId}"></my-widget>
          <script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        />
      </div>
    </div>
  );
};

export default page;
