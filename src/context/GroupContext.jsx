// src/context/GroupContext.jsx
import { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export function GroupProvider({ children }) {
  const [groups, setGroups] = useState([
    { id: 1, name: "Readers United", members: ["👩‍💼", "👨‍💻"] },
    { id: 2, name: "Sci-Fi Squad", members: ["🧑‍🚀", "👽", "🤖"] },
    { id: 3, name: "Mystery Minds", members: ["🕵️‍♀️", "🕵️‍♂️"] },
  ]);

  const [activeGroupIndex, setActiveGroupIndex] = useState(1);

  const switchGroup = (direction) => {
    setActiveGroupIndex((prev) =>
      (prev + direction + groups.length) % groups.length
    );
  };

  const addUserToGroup = (groupId, userIcon) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, members: [...g.members, userIcon] }
          : g
      )
    );
  };

  return (
    <GroupContext.Provider
      value={{ groups, activeGroupIndex, switchGroup, addUserToGroup }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export const useGroups = () => useContext(GroupContext);
