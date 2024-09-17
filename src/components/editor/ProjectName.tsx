import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeName as changeNameRedux } from "@/store/features/project-data.slice";

interface ProjectNameProps {}

const ProjectName: FunctionComponent<ProjectNameProps> = () => {
  const projectName = useAppSelector(
    (state) => state.projectDataSlice.value.name
  );
  const dispatch = useAppDispatch();

  const changeName = (e) => {
    dispatch(changeNameRedux(e.target.value));
  };

  return (
    <>
      <div className="flex">
        <input
          className="bg-zinc-800 text-white border-zinc-500 focus-visible:outline-none w-[180px]"
          maxLength={25}
          value={projectName}
          onChange={changeName}
        />
      </div>
    </>
  );
};

export default ProjectName;
