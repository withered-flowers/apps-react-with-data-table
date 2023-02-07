// Using zustand since state management in zustand is easier than Redux / Toolkit
import { create } from "zustand";
import { Project, Status, Type } from "../schemas/projects";

const BASE_URL = "http://localhost:3001";

type State = {
  projects: Project[];
  filteredProjects: Project[];
};

type SpecialWord = "is" | "not" | "after";
type SpecialEnum = Type | Status;

type Action = {
  fetchProjects: () => void;

  // Filter need to get the search value and the sort value
  filterProjects: ({
    searchVal,
    sortVal,
  }: {
    searchVal: string;
    sortVal: string;
  }) => void;
};

const initialState: State = {
  projects: [],
  filteredProjects: [],
};

export const useProjectStore = create<State & Action>((set, get) => ({
  ...initialState,

  fetchProjects: async () => {
    const response = await fetch(`${BASE_URL}/projects`);
    const responseJson: Project[] = await response.json();

    set({ projects: responseJson, filteredProjects: responseJson });
  },

  filterProjects: ({ searchVal, sortVal }) => {
    const filteredProjects = get()
      .projects.filter((project) => {
        if (searchVal === "") {
          return project;
        } else {
          return project.name.toLowerCase().includes(searchVal.toLowerCase());
        }
      })
      .sort((a, b) =>
        sortVal === "asc"
          ? new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
          : new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );

    set({ filteredProjects });
  },
}));
