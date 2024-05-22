import { Route } from "react-router-dom";
// import { MenuData } from "./MenuData";
import { useMenuData } from "./useMenuData";

const routeGenerator = (data, path = null) =>
  data.map((e, i) => {
    const subRouter = e.children;
    if (!subRouter) {
      return (
        <Route
          key={i + e.path}
          path={path ? `${path}/${e.path}` : e.path}
          element={e.component}
        />
      );
    } else {
      return [
        <Route key={i + e.path} path={e.path} element={e.component} />,
        ...routeGenerator(subRouter,path ? `${path}/${e.path}` : e.path),
      ];
    }
  });

export const useSideMenuRouter = () => {
  const menuData = useMenuData()
  return routeGenerator(menuData);
};



// const routeGenerator = (data, path = null) =>
//   data.map((e, i) => {
//     const subRouter = e?.children;
//     if (subRouter === undefined) {
//       return (
//         <Route
//           key={i + e.path}
//           path={path ? `${path}/${e.path}` : e.path}
//           element={e.component}
//         />
//       );
//     } else if (subRouter.length > 0)
//       return [
//         <Route key={i + e.path} path={e.path} element={e.component} />,
//         ...routeGenerator(subRouter, e.path),
//       ];
//     else return null;
//   });

// export const useSideMenuRouter = () => {
//   const menuData = useMenuData();
//   return routeGenerator(menuData);
// };

