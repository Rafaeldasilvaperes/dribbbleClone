
import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectActions from '@/components/ProjectActions';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Project = async ({ params: {id} }: { params: { id: string }}) => {

  const session = await getCurrentUser();
  const result = await getProjectDetails(id) as { project?: ProjectInterface };

  if(!result?.project){
    <p>Fail to fetch project information</p>
  }

  const projectDetails = result?.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

  return (
    <Modal>

      <section className='max-w-4xl max-xs:flex-col w-full'>
        <div className='flexStart gap-4'>
        <Link href={renderLink()} className='hover:brightness-75'>
            <Image
              src={projectDetails?.createdBy.avatarUrl!}
              width={47}
              height={47}
              className="rounded-full"
              title={projectDetails?.createdBy?.name}
              alt="user profile image"
            />
          </Link>
          <div className='gap-4'>
            <p className="modal-head-text md:text-4xl">{projectDetails?.title}</p>
            <div className='flexStart gap-3'>
              <Link href={renderLink()}>
                <p className='hover:text-slate-500'>{projectDetails?.createdBy?.name}</p> 
              </Link>
              <Image 
                width={5}
                height={5}
                src='/dot.svg'
                alt='Dot'
              />
              <Link 
                href={`/?category=${projectDetails?.category}`} className="text-primary-purple font-semibold hover:text-violet-900"
              >
                {projectDetails?.category}
              </Link>
            </div>              
          </div>           
        </div>  

        {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={projectDetails?.id} />
                    </div>
                )}        
      </section>

      <section className='mt-14'>
        <Image 
          width={1064}
          height={798}
          src={projectDetails?.image!}
          alt='Project Design'
          className='rounded-2xl object-cover hover:shadow-lg'
          />    
      </section>

      <section className='flexCenter flex-1 flex flex-col gap-5'>
        <h4 className='w-full max-w-screen-md text-justify text-xl'>{projectDetails?.description}</h4>
        <div className='flexCenter gap-5'>
        <Link href={projectDetails?.liveSiteUrl!} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium hover:text-violet-600">
            <Image 
              width={20}
              height={20}
              src='/rocket.svg'
              alt='Rocket svg'
              
            />
            <p>Live Site</p>
          </Link>
          <Image 
              width={5}
              height={5}
              src='/dot.svg'
              alt='Dot'
            />

        <Link href={projectDetails?.githubUrl!} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium hover:text-violet-600">
          <Image 
              width={20}
              height={20}
              src='/github.svg'
              alt='Github'
            />
            <p>Github</p>

          </Link>
        </div>
      </section>
      
      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
            <Image
                src={projectDetails?.createdBy?.avatarUrl!}
                className="rounded-full hover:brightness-75"
                width={82}
                height={82}
                title={projectDetails?.createdBy?.name}
                alt="profile image"
            />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects userId={projectDetails?.createdBy?.id!} projectId={projectDetails?.id!} />

    </Modal>
  )
}

export default Project