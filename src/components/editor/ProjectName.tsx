import { FunctionComponent } from "react";

interface ProjectNameProps {}

const ProjectName: FunctionComponent<ProjectNameProps> = () => {
  return (
    <>
      <div className="flex">
        <input
          className="bg-zinc-800 text-white border-zinc-500 focus-visible:outline-none w-[180px]"
          defaultValue={"Untitled xcvjkldfgsj ksjg klfsdgjklfj dsalkfj dskl"}
          maxLength={25}
        />
      </div>
    </>
  );
};

export default ProjectName;
