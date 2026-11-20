
import { createBrowserRouter, Outlet, RouterProvider, useLoaderData, useParams } from 'react-router'

// https://reactrouter.com/start/data/routing

function DataRouter() {
    return (
        <>
            <div>Data Router</div>
            <RouterProvider router={router} />
        </>
    )
}

const router = createBrowserRouter([
  {
    index: true,
    element: <div>data-router.tsx</div>,
  },
  {
    path: 'page1',
    element: <div>Page 1</div>,
  },
  {
    path: 'page2',
    element: <div>Page 2 <Outlet /></div>,
    children: [
        {
            path: 'subpage',
            element: <div>Subpage</div>
        }
    ]
  },
  {
    path: 'page3', //path without element will route children with parent prefix
    children: [
        {
            index: true,
            element: <div>Page 3</div>
        },
        {
            path: 'subpage',
            element: <div>Subpage</div>
        }
    ]
  },
  {
    element: <div>Page 4 <Outlet /></div>, // element without parent path will wrap children in element
    children: [
        {
            path: 'Page4Subpage1',
            element: <div>Subpage 1</div>
        }
    ]
  },
  {
    path: 'page5',
    element: <div>Page 5 <Outlet /></div>,
    children: [
        {
            path: ':id/:name/test?', // optional param is defined by a ? behind it, search param is defined by a ? in front of it
            element: <Page5DynamicSegment /> // ending the url with a ? and a param makes it a search param, different from an optional param defined by a ? behind it

        }
    ]
  },
  {
    path: 'page6/:id/*',
    loader: async (obj) => { // loader is a function that runs before the componwent is rendered
        // async ({params}) will destructure the object to only retrieve params child
        console.log(obj);
        return obj.params
    },
    Component: Page6DynamicSegment // Component is a new prop that allows you to define a component that will be rendered when the route is matched, instead of using the element prop. This allows you to use the loader function to fetch data before the component is rendered.
  }
])

function Page5DynamicSegment() {
    let params = useParams();
    return (
        <div>{params.id} {params.name}</div>
    )
}

function Page6DynamicSegment() {
    let params = useLoaderData(); // useLoaderData is a hook that allows access to data returned from loader function
    console.log(params);
    return (
        <div>{params.id} {params["*"]}</div>
    )
}

export default DataRouter;