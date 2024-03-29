const { Candidate } = require('../model/candidate');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
};

const voteCandidate = async (req, res) => {
    const { selectedCandidates } = req.body;
    const {user} = req.body;

    if (!Array.isArray(selectedCandidates) || selectedCandidates.length === 0) {
        return res.status(400).json({ error: 'Invalid selectedCandidates array' });
    }

    try {
        for (const candidateId of selectedCandidates) {
            await Candidate.findByIdAndUpdate(candidateId, { $inc: { voteCount: 1 } });
        }
        res.json({ message: 'Votes recorded successfully'});
    } catch (error) {
        console.error('Error voting:', error);
        res.status(500).json({ error: 'Failed to record votes' });
    }
};
const addCandidates = async (req, res) => {
    try {
        const { candidates } = req.body;
        if (!Array.isArray(candidates)) {
            throw new TypeError('Candidates must be provided as an array');
        }

        for (const candidateData of candidates) {
            const candidate = new Candidate(candidateData);
            await candidate.save();
        }

        res.status(201).json({ message: 'Candidates added successfully' });
    } catch (error) {
        console.error('Error adding candidates:', error);
        res.status(500).json({ error: error.message || 'Failed to add candidates. Please try again later.' });
    }
};



module.exports = { getCandidates, voteCandidate, addCandidates };

