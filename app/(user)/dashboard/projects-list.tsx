import React from 'react';
import { InferSelectModel } from 'drizzle-orm';
import { projects } from '@/db/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { monthlyPlaId, yearlyPlanId } from '@/lib/payment';
import SubscribeButton from '../payments/subscribe-button';
import { Lock } from 'lucide-react';

type Project = InferSelectModel<typeof projects>;

type ProjectListProps = {
  projects: Project[];
};

const ProjectList = (props: ProjectListProps) => {
  return (
    <div className='mt-10'>
      <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {props.projects.map((item: Project) => (
          <li key={item.id}>
            <Card className='max-w-xl flex flex-col'>
              <CardHeader className='flex-1'>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/projects/${item.id}`}>
                  <Button>View Project</Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
        <Card className='max-w-[400px] flex flex-col h-full bg-gray-300'>
          <CardHeader className='flex-1'>
            <CardTitle className='flex'>
              <Lock className='h-6 w-6 mr-2' />
              <span>Upgrade to Premium</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Unlock unlimited projects</CardDescription>
          </CardContent>
          <CardFooter>
            <SubscribeButton price={monthlyPlaId} />
          </CardFooter>
        </Card>
      </ul>
    </div>
  );
};

export default ProjectList;
