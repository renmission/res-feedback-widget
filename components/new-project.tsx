import React from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createProject } from '@/actions/createProjects';
import SubmitButton from './submit-button';

const NewProject = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] rounded-md'>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started!
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-4' action={createProject}>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name' placeholder='Project Name' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='url'>URL</Label>
            <Input id='url' name='url' placeholder='https://example.com' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Description (Optional)'
            />
          </div>
          <SubmitButton text='Create Project' />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
