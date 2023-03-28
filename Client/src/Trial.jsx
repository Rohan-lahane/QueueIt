import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function ParentComponent() {
  return (
    <div>
      <h1>Parent Component</h1>
      <Link to="/child">Child Component</Link>
    </div>
  );
}

function ChildComponent() {
  return (
    <div>
      <h1>Child Component</h1>
      <p>This is the child component.</p>
    </div>
  );
}

function Trial() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentComponent />} />
        <Route path="/child" element={<ChildComponent />} />
      </Routes>
    </Router>
  );
}


export default Trial