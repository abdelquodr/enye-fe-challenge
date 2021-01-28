import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'
import enye from './img/enye.png'
// import './App.css';

function App() {

  const pageNumber = [];

  // state
  const [post, setPost] = useState([])
  const [, seterr] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  const [input, setInput] = useState('');
  const [searchInputResult, setSearchInputResult] = useState([]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;


  // page number loop
  for (let i = 1; i <= Math.ceil(post?.length / postPerPage); i++) {
    pageNumber.push(i)
  }

  // handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(() => ({ [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = post?.filter(obj => obj.FirstName.toLowerCase() === input.search.toLowerCase());
    setSearchInputResult(result)
    setInput(() => ({ input: '' }))
    console.log(input)
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://api.enye.tech/v1/challenge/records`)
        setPost(response.data.records.profiles)
      } catch (err) {
        seterr(err)
      }
    })();
  }, []);


  // functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const currentPost = post?.slice(indexOfFirstPost, indexOfLastPost);


  return (
    <div className="">
      <div className="container-fluid bg-primary">
        <div className="container">
          <nav className="navbar navbar-light justify-content-between py-2" height="3em">
            <img className="navbar-brand" src={enye} height="100em" />
            <form className="form-inline d-flex" onSubmit={handleSubmit}>
              <input className="form-control mr-sm-2" onChange={handleChange} width='30%' name='search' type="search" placeholder="Search Firstname" aria-label="Search" />
              <button className="btn btn-outline-light my-2 my-sm-0 font-weight-bold" type="submit">search</button>
            </form>
          </nav>
        </div>
      </div>
      <div className="container pt-4">
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-dark font-weight-bold">
            <div className="row">
              <h5 className="col-md-4 text-center">FirstName</h5>
              <h5 className="col-md-4 text-center">LastName</h5>
              <h5 className="col-md-4 text-center">Gender</h5>
            </div>
          </li>
          {searchInputResult.length > 0 ? (searchInputResult.map((obj, i) => <Pagination key={i} obj={obj} ></Pagination>)) : (currentPost.map((obj, i) => <Pagination key={i} obj={obj} ></Pagination>))}
        </ul>
        <div className="d-flex py-5 justify-content-center" >
          {pageNumber.map((num, i) => <ul className="pagination px-3 "><li className="page-item border border-primary rounded px-3 py-2 bg-light text-primary" onClick={() => paginate(num)} key={i}>{num}</li></ul>)}
        </div>
      </div>
    </div>

  );
}

export default App;
