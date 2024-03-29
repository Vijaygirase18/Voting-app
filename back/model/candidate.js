const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    voteCount: {
        type: Number,
        default: 0
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Candidate = mongoose.model('Candidate', candidateSchema);

const sampleCandidates = [
    { name: 'Candidate 1', party: 'Party A' },
    { name: 'Candidate 2', party: 'Party B' },
    { name: 'Candidate 3', party: 'Party C' },
    { name: 'Candidate 4', party: 'Party D' }
];

module.exports = { Candidate, sampleCandidates };
