import { useState } from "react";
import { Icon } from "@iconify-icon/react";

import { Project, Status } from "../schemas/projects";
import { useEffect } from "react";
import { useProjectStore } from "../stores/project";
import useDebounce from "../hooks/usehooks-ts";

const createComponent = (project: Project) => {
  switch (project.status) {
    case Status.Incomplete:
      return <h1>Incomplete</h1>;
    case Status.Completed:
      return <h1>Completed</h1>;
    case Status.Editing:
      return <h1>Editing</h1>;
    case Status.Feedback:
      return <h1>Feedback</h1>;
    case Status.Shooting:
      return <h1>Shooting</h1>;
    default:
      return <h1>Unknown Status</h1>;
  }
};

const DataGrid = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [selectSortBy, setSelectSortBy] = useState<string>("");

  const debouncedInputSearch = useDebounce<string>(inputSearch);

  const projects = useProjectStore((state) => state.filteredProjects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const filterProjects = useProjectStore((state) => state.filterProjects);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects({
      searchVal: debouncedInputSearch,
      sortVal: selectSortBy,
    });
  }, [debouncedInputSearch, selectSortBy]);

  const inputOnChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputSearch(evt.currentTarget.value);
  };

  const selectOnChangeHandler = (evt: React.FormEvent<HTMLSelectElement>) => {
    setSelectSortBy(evt.currentTarget.value);
  };

  return (
    <section className="w-3/4 flex flex-col mx-auto">
      <div className="flex flex-row p-3 items-center justify-between">
        <p className="text-3xl font-semi">Recent Project</p>
        <div className="flex gap-2">
          <input
            type="text"
            className="p-4 bg-gray-200  rounded-lg"
            placeholder="Search"
            value={inputSearch}
            onChange={inputOnChangeHandler}
          />
          <select
            className="p-4 rounded-lg bg-gray-200"
            onChange={selectOnChangeHandler}
            defaultValue={""}
          >
            <option value="" disabled>
              --- Sort By Date ---
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <table className="table-auto w-full border-separate border-spacing-2 border border-slate-50 mx-auto rounded-xl">
        <thead>
          <tr className="border border-slate-300 bg-gray-50">
            <th className="p-2 text-left">Name</th>
            <th className="text-left">Type</th>
            <th className="text-left">Status</th>
            <th className="text-left">Created</th>
            <th className="text-left">Manage</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border border-slate-400 rounded-xl bg-slate-50"
            >
              <td className="p-2 ">{project.name}</td>
              <td className="capitalize">{project.type}</td>
              <td>{<>{createComponent(project)}</>}</td>
              <td>{new Date(project.createdOn).toDateString()}</td>
              <td>
                <div className="flex items-center justify-center">
                  <Icon
                    className="cursor-pointer bg-gray-200 p-2 rounded-full hover:bg-gray-400 hover:text-white"
                    inline={true}
                    icon="mdi:dots-vertical"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DataGrid;
