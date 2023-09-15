
import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import Image from 'next/image';
import React from 'react'

const Project = async ({ params: {id} }: { params: { id: string }}) => {

  const session = await getCurrentUser();
  const result = await getProjectDetails(id) as { project?: ProjectInterface };

  if(!result?.project){
    <p>Fail to fetch project information</p>
  }

  console.log(result?.project)

  return (
    <Modal>

      <div className='w-full flex-1 flex flex-col gap-12 mb-5'>
        <div className='flexStart gap-4'>
          <Image
            src={result?.project?.createdBy.avatarUrl!}
            width={47}
            height={47}
            className="rounded-full"
            alt="user profile image"
          />
          <div className='gap-4'>
            <p className="modal-head-text md:text-4xl">{result?.project?.title}</p>
            <div className='flexStart gap-3'>
            <p>{result?.project?.createdBy?.name}</p> 
            <Image 
            width={5}
            height={5}
            src='/dot.svg'
            alt='Dot'
            />
            <p className='font-bold text-violet-600'>{result?.project?.category}</p>
            </div>
              
          </div>           
        </div> 

        <Image 
        width={200}
        height={200}
        src={result?.project?.image!}
        alt='Project Design'
        className='rounded-2xl w-11/12 hover:shadow-lg'
        />      
      </div>

      <div className='flexCenter flex-1 flex flex-col gap-5'>
        <h4 className='w-full max-w-screen-md text-justify text-xl'>{result?.project?.description}</h4>
        <div className='flexCenter gap-5'>
          <div className='flexCenter gap-2 hover:text-violet-600 cursor-pointer'>
            <Image 
              width={20}
              height={20}
              src='/rocket.svg'
              alt='Rocket svg'
            />
            <p>Live Site</p>
          </div>
          <Image 
              width={5}
              height={5}
              src='/dot.svg'
              alt='Dot'
            />

          <div className='flexCenter gap-2 hover:text-violet-600 cursor-pointer'>
          <Image 
              width={20}
              height={20}
              src='/github.svg'
              alt='Github'
            />
            <p>Github</p>

          </div>
        </div>
      </div>
      


    </Modal>
  )
}

export default Project