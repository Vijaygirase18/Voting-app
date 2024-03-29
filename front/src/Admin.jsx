// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import VotePage from './Vote';

// const AdminHomePage = () => {
//     const [candidates, setCandidates] = useState([]);
//     const [name, setName] = useState('');
//     const [party, setParty] = useState('');
//     const [age, setAge] = useState('');
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [candidatesPerPage] = useState(5);
//     const [votingEnabled, setVotingEnabled] = useState(true);

//     useEffect(() => {
//         fetchCandidates();
//     }, []);

//     const fetchCandidates = async () => {
//         try {
//             const response = await axios.get(`http://localhost:4000/candidates?page=${currentPage}&limit=${candidatesPerPage}`);
//             setCandidates(response.data);
//         } catch (error) {
//             console.error('Error fetching candidates:', error);
//         }
//     };

//     const handleAddCandidate = async (e) => {
//         e.preventDefault();

//         if (!name || !party || !age) {
//             setError('Please fill in all fields');
//             return;
//         }

//         const newCandidate = { name, party, age };

//         try {
//             const response = await axios.post(
//                 'http://localhost:4000/candidates/add',
//                 { candidates: [newCandidate] }
//             );

//             setCandidates([...candidates, newCandidate]);
//             setSuccessMessage(response.data.message);
//             setName('');
//             setParty('');
//             setAge('');
//         } catch (error) {
//             console.error('Error adding candidate:', error);
//             setError('Failed to add candidate. Please try again later.');
//         }
//     };

//     const handleLogout = () => {
//         console.log('Logout clicked');
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         window.location.href = '/';
//     };

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const toggleVoting = () => {
//         setVotingEnabled(prevVotingEnabled => !prevVotingEnabled);
//     };

//     return (
//         <div className="container">
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container-fluid">
//                     <span className="navbar-brand">Voting App</span>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
//                         <ul className="navbar-nav mb-2 mb-lg-0">
//                             <li className="nav-item dropdown">
//                                 <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
//                                     Profile
//                                 </button>
//                                 <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                     <li><a className="dropdown-item" href="#">Profile</a></li>
//                                     <li><a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a></li>
//                                 </ul>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>

//             <div className="container">
//                 <h1 className="mt-4 mb-4">Admin Home Page</h1>
//                 <div className="row mb-4">
//                     <div className="col-md-12">
//                         <h6>Add Candidate</h6>
//                         {error && <div className="text-danger mb-2">{error}</div>}
//                         {successMessage && <div className="text-success mb-2">{successMessage}</div>}
//                         <form onSubmit={handleAddCandidate}>
//                             <div className="row">
//                                 <div className="col-md-4">
//                                     <label className="form-label">Name:</label>
//                                     <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter candidate name" required />
//                                 </div>
//                                 <div className="col-md-4">
//                                     <label className="form-label">Party:</label>
//                                     <input type="text" className="form-control" value={party} onChange={(e) => setParty(e.target.value)} placeholder="Enter party name" required />
//                                 </div>
//                                 <div className="col-md-4">
//                                     <label className="form-label">Age:</label>
//                                     <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter candidate age" required />
//                                 </div>
//                             </div>
//                             <button type="submit" className={`btn btn-primary mt-2`}>Add Candidate</button>

//                             <div className="container mt-4">
//                                 <button className={`btn btn-${votingEnabled ? 'primary' : 'secondary'}`} onClick={toggleVoting}>
//                                     {votingEnabled ? "Disable Voting" : "Enable Voting"}
//                                 </button>

//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <div className="table-responsive">
//                     <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Candidate Name</th>
//                                 <th scope="col">Party</th>
//                                 <th scope="col">Age</th>
//                                 <th scope="col">Vote Count</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {candidates.map((candidate, index) => (
//                                 <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
//                                     <td>{candidate.name}</td>
//                                     <td>{candidate.party}</td>
//                                     <td>{candidate.age}</td>
//                                     <td>{candidate.voteCount}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                     {Array.from({ length: Math.ceil(candidates.length / candidatesPerPage) }).map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => paginate(index + 1)}
//                             className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminHomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHomePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [name, setName] = useState('');
    const [party, setParty] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [candidatesPerPage] = useState(5);
    const [votingEnabled, setVotingEnabled] = useState(true);
    const [disabled, setDisabled] = useState(false);
    console.log(votingEnabled);
    useEffect(() => {
        localStorage.setItem('enabled',votingEnabled);

    })
    useEffect(() => {

        fetchCandidates();
    }, [currentPage]);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/candidates?page=${currentPage}&limit=${candidatesPerPage}`);
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleAddCandidate = async (e) => {
        e.preventDefault();

        if (!name || !party || !age) {
            setError('Please fill in all fields');
            return;
        }

        const newCandidate = { name, party, age };

        try {
            const response = await axios.post(
                'http://localhost:4000/candidates/add',
                newCandidate
            );

            setCandidates([...candidates, newCandidate]);
            setSuccessMessage(response.data.message);
            setName('');
            setParty('');
            setAge('');
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('Failed to add candidate. Please try again later.');
        }
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    const handleToggleVoting = () => {
        const newVotingStatus = !votingEnabled;
        setVotingEnabled(newVotingStatus);

        axios.put('http://localhost:4000/toggle-voting', { enabled: newVotingStatus })
            .then(response => {
                console.log('Voting status updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error toggling voting status:', error);
            });
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand">Voting App</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1 className="mt-4 mb-4">Admin Home Page</h1>
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h6>Add Candidate</h6>
                        {error && <div className="text-danger mb-2">{error}</div>}
                        {successMessage && <div className="text-success mb-2">{successMessage}</div>}
                        <form onSubmit={handleAddCandidate}>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="form-label">Name:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter candidate name" required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Party:</label>
                                    <input type="text" className="form-control" value={party} onChange={(e) => setParty(e.target.value)} placeholder="Enter party name" required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Age:</label>
                                    <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter candidate age" required />
                                </div>
                            </div>
                            <button type="submit" className={`btn btn-primary mt-2`}>Add Candidate</button>
                            <div className="container mt-4">
                                <button className={`btn btn-${votingEnabled ? 'primary' : 'secondary'}`} onClick={handleToggleVoting}>
                                    {votingEnabled ? "Disable Voting" : "Enable Voting"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Candidate Name</th>
                                <th scope="col">Party</th>
                                <th scope="col">Age</th>
                                <th scope="col">Vote Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.party}</td>
                                    <td>{candidate.age}</td>
                                    <td>{candidate.voteCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    {Array.from({ length: Math.ceil(candidates.length / candidatesPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePagination(index + 1)}
                            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;





