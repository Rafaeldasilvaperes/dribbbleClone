"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { deleteProject, fetchToken } from '@/lib/actions'
import { useRouter } from 'next/navigation'

function ProjectActions({ projectId }: { projectId: string }) {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteProject = async () => {
    setIsDeleting(true);
    
    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

      router.push('/');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Link 
        href={`/edit-project/${projectId}`}
        className='flexCenter edit-action_btn'
      >
        <Image 
         src="/pencile.svg"
         width={15}
         height={15}
         alt='Edit'
        />      
      </Link>

      <button
      type='button'
      className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`}
      onClick={handleDeleteProject}
      >
        <Image 
          src="/trash.svg"
          width={15}
          height={15}
          alt='Delete'

        />
      </button>
    </>
  )
}

export default ProjectActions