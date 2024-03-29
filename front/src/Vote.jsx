import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function VotePage() {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [error, setError] = useState(null);
    const [votedMessage, setVotedMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [isVoted, setIsVoted] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const location = useLocation();
    const voteError = new URLSearchParams(location.search).get('voteError');
    const [currentPage, setCurrentPage] = useState(1);
    const [candidatesPerPage] = useState(5);

    useEffect(() => {
        fetchCandidates();
        fetchUser();
    }, [currentPage]);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:4000/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            setError('Failed to fetch candidates. Please try again later.');
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:4000/user');
            setUserName(response.data.name);
            setIsVoted(response.data.isVoted);
            setShowTable(!response.data.isVoted);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleCandidateSelection = (candidateId) => {
        setSelectedCandidate(candidateId);
    };

    const voteCandidate = async () => {
        try {
            const token = localStorage.getItem('token');

            const voteResponse = await axios.post(
                'http://localhost:4000/candidates/vote',
                { selectedCandidates: [selectedCandidate] },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setVotedMessage(voteResponse.data.message);

            const userId = localStorage.getItem('userId');
            const updateResponse = await axios.put('http://localhost:4000/update-is-voted', { _id: userId, isVoted: true });
            console.log('isVoted updated successfully:', updateResponse.data);

            fetchCandidates();

            setIsVoted(true);
            setShowTable(false);
        } catch (error) {
            console.error('Error voting:', error);
            if (error.response && error.response.status === 400) {
                setError('You have already voted');
            } else {
                setError('Please select a candidate');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUserName('');
        navigate('/');
    };
    
    const valueReceived = localStorage.getItem('enabled');
    const disabled = valueReceived;
    console.log('value',disabled);

    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid vote-page">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="#">Voting App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userName ? userName : 'User Profile'}
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="#">Profile</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/" onClick={handleLogout}>Logout</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1>Candidates</h1>
                {voteError && <div className="alert alert-danger">{voteError}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {votedMessage && <div className="alert alert-success">{votedMessage}</div>}
                {showTable && (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Party</th>
                                    <th>Age</th>
                                    <th>Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCandidates.map((candidate) => (
                                    <tr key={candidate._id}>
                                        <td>{candidate.name}</td>
                                        <td>{candidate.party}</td>
                                        <td>{candidate.age}</td>
                                        <td>
                                            {disabled == 'true' && (
                                                <input
                                                    type="radio"
                                                    name="candidate"
                                                    value={candidate._id}
                                                    checked={selectedCandidate === candidate._id}
                                                    onChange={() => handleCandidateSelection(candidate._id)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            className="btn btn-primary"
                            onClick={voteCandidate}
                            disabled={!selectedCandidate}
                        >
                            Vote
                        </button>
                    </div>
                )}
                {!showTable && (
                    <div>
                        <p className="text-success">Thank you for voting!</p>
                    </div>
                )}
            </div>
            <div className="container">
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(candidates.length / candidatesPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default VotePage;























































// code33
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


// function VotePage({ votingEnabled }) {
//     const navigate = useNavigate();
//     const [candidates, setCandidates] = useState([]);
//     const [selectedCandidate, setSelectedCandidate] = useState('');
//     const [error, setError] = useState(null);
//     const [votedMessage, setVotedMessage] = useState('');
//     const [userName, setUserName] = useState('');
//     const [isVoted, setIsVoted] = useState(false);
//     const [showTable, setShowTable] = useState(true);
//     const location = useLocation();
//     const voteError = new URLSearchParams(location.search).get('voteError');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [candidatesPerPage] = useState(5);

//     useEffect(() => {
//         fetchCandidates();
//         fetchUser();
//     }, []);

//     const fetchCandidates = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/candidates');
//             setCandidates(response.data);
//         } catch (error) {
//             console.error('Error fetching candidates:', error);
//             setError('Failed to fetch candidates. Please try again later.');
//         }
//     };

//     const fetchUser = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/user');
//             setUserName(response.data.name);
//             setIsVoted(response.data.isVoted);
//             setShowTable(!response.data.isVoted);
//         } catch (error) {
//             console.error('Error fetching user profile:', error);
//         }
//     };

//     const handleCandidateSelection = (candidateId) => {
//         setSelectedCandidate(candidateId);
//     };

//     const voteCandidate = async () => {
//         try {
//             const token = localStorage.getItem('token');

//             const voteResponse = await axios.post(
//                 'http://localhost:4000/candidates/vote',
//                 { selectedCandidates: [selectedCandidate] },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setVotedMessage(voteResponse.data.message);

//             const userId = localStorage.getItem('userId');
//             const updateResponse = await axios.put('http://localhost:4000/update-is-voted', { _id: userId, isVoted: true });
//             console.log('isVoted updated successfully:', updateResponse.data);

//             fetchCandidates();

//             setIsVoted(true);
//             setShowTable(false);
//         } catch (error) {
//             console.error('Error voting:', error);
//             if (error.response && error.response.status === 400) {
//                 setError('You have already voted');
//             } else {
//                 setError('Please select a candidate');
//             }
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         setUserName('');
//         navigate('/');
//     };

//     const indexOfLastCandidate = currentPage * candidatesPerPage;
//     const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
//     const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     return (
//         <div className="container-fluid vote-page">
//             <h1>Candidates</h1>
//             {voteError && <div className="alert alert-danger">{voteError}</div>}
//             {error && <div className="alert alert-danger">{error}</div>}
//             {votedMessage && <div className="alert alert-success">{votedMessage}</div>}
//             {votingEnabled && showTable && (
//                 <div>
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Party</th>
//                                 <th>Age</th>
//                                 <th>Vote</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentCandidates.map((candidate) => (
//                                 <tr key={candidate._id}>
//                                     <td>{candidate.name}</td>
//                                     <td>{candidate.party}</td>
//                                     <td>{candidate.age}</td>
//                                     <td>
//                                         <input
//                                             type="radio"
//                                             name="candidate"
//                                             value={candidate._id}
//                                             checked={selectedCandidate === candidate._id}
//                                             onChange={() => handleCandidateSelection(candidate._id)}
//                                         />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <button
//                         className="btn btn-primary"
//                         onClick={voteCandidate}
//                         disabled={!selectedCandidate}
//                     >
//                         Vote
//                     </button>
//                 </div>
//             )}
//             {!votingEnabled && (
//                 <div>
//                     <p className="text-danger">Voting is currently disabled by the admin.</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default VotePage;

