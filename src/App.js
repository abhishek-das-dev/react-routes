// https://reactrouter.com/en/v6.3.0/getting-started/overview

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HooksComponent from "./hooks";

export default function App() {
  return (
    <div className="container">
      <Router>
        <AppRoutes />
      </Router>
    </div>
    
  );
}
function AppRoutes() {
  const navigate = useNavigate();

  const customNavigate = () => {
      navigate("/topics", { state: { test: "test" } });
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics" state={{ state: "mystate" }}>
            Topics
          </Link>
        </li>
        <li>
          <Link to="/topic/123">Topics with data</Link>
        </li>
        <li>
          <Link to="/invoices">Invoices</Link>
        </li>
        <li>
          <Link to="/invoices/12">Child invoice with id</Link>
        </li>
        <li>
          <Link to="/invoices/sent">Invoices sent</Link>
        </li>
        <li>
          <Link to="/hooks">Take me to hooks</Link>
        </li>
      </ul>
      <button onClick={customNavigate}>Click Me</button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topic/:topicId" element={<Topic />} />
        <Route path="invoices" element={<Invoices />}>
          <Route path=":invoiceId" element={<Invoice />} />
          <Route path="sent" element={<SentInvoices />} />
        </Route>
        <Route path="/hooks" element={<HooksComponent /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function Invoices() {
  return (
    <div>
      <h1>Invoices</h1> <Outlet />
    </div>
  );
}
function Invoice() {
  let { invoiceId } = useParams();
  return <h2>Invoice - {invoiceId}</h2>;
}

function SentInvoices() {
  return <h2>Sent Invoices Page</h2>;
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Topics() {
  const { state } = useLocation();
  return (
    <div>
      <h2>Topics Page</h2>
      {JSON.stringify(state)}
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

function NotFound() {
  return <h1>Page Not Found</h1>;
}
