
import { useEffect } from 'react'
import { Outlet, Route, Routes, useParams, useNavigate, useSearchParams, useLocation } from 'react-router'

// https://reactrouter.com/start/declarative/routing

function DeclarativeRouter() {
  return (
    <Routes>
      <Route index element={<div>Homepage</div>} />
      <Route path="page1" element={<div>Page 1</div>} />
      <Route path="page2" element={<div>Page 2 <Outlet /></div>}>
        <Route index element={<div>Index</div>} />
        <Route path="subpage" element={<div>Subpage</div>} />
      </Route>
      <Route element={<div>Page 3 <Outlet /></div>}>
        <Route path="page3" element={<div>Nested</div>} />
      </Route>
      <Route path="page4">
        <Route index element={<div>Page 4 Index</div>} />
        <Route path="subpage" element={<div>Page 4 Subpage</div>} />
      </Route>
      <Route path="page5" element={<div>Page 5 <Outlet /></div>}>
        <Route path=":id/:name?/test?" element={<Page5DynamicSegment />} />
        <Route path="subpage/*" element={<Page5Splat />} />
        {/* ending the url with a ? and a param makes it a search param, different from an optional param defined by a ? behind it */}
      </Route>
      <Route path="timedNavigate" element={<TimedNavigate />} />
    </Routes>
  )
}

function Page5DynamicSegment() {
  let params = useParams()
  let [searchParams] = useSearchParams();
  console.log(searchParams);
  let location = useLocation();
  console.log(location);
  return (
    <div>ID: {params.id}, Name: {params.name}</div>
  )
}

function Page5Splat() {
  let params = useParams()
  let { "*": splat } = useParams();

  return (
    // <div>Splat: {params['*']}</div>
    <div>Splat: {splat}</div>
  )
}

function TimedNavigate() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/page1')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div>
      You will be redirected to Page 1 in 3 seconds...
    </div>
  )
}

export default DeclarativeRouter