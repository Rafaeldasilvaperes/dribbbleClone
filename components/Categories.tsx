"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { categoryFilters } from "@/constants"

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  const handleTags = (filter: string) => {
    router.push(`${pathName}?category=${filter}`)
  }

  return (
    <div className="flexCenter w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter ? 'bg-light-white-100 font-medium' : 'font-normal'
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap hover:bg-purple-100`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  )
}

export default Categories