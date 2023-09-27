import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: { 
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
}

type SearchParams = {
  category?: string;
  endcursor?: string;
}

type Props = {
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;


const Home = async ({ searchParams: { category, endcursor }}: Props) => {

  const data = await fetchAllProjects(category,endcursor) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];

  // If no project
  if(projectsToDisplay.length === 0){
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No projects found, go create some first!</p>
      </section>
    )
  }

  const loadMore = data?.projectSearch?.pageInfo;
  // else, hence projects
  return(
    <section className="flex-start flex-col paddings mb-16">
      <Categories></Categories>
      <section className="projects-grid"> 
        {projectsToDisplay.map(({ node}: { node: ProjectInterface}) => (
          <ProjectCard 
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <Pagination 
        startCursor={loadMore.startCursor}
        endCursor={loadMore.endCursor}
        hasPreviousPage={loadMore.hasPreviousPage}
        hasNextPage={loadMore.hasNextPage}
      />      
    </section>
  )
}

export default Home;