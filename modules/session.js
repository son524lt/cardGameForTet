//type: spade, club, diamond, heart
const standardCardSet = [
    'H2', 'D2', 'C2', 'S2', 'HX', 'HJ', 'HQ',
    'HK', 'HA', 'H9', 'H8', 'H7', 'H6', 'H5',
    'H4', 'H3', 'DX', 'DJ', 'DQ', 'DK', 'DA',
    'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3',
    'CX', 'CJ', 'CQ', 'CK', 'CA', 'C9', 'C8',
    'C7', 'C6', 'C5', 'C4', 'C3', 'SX', 'SJ',
    'SQ', 'SK', 'SA', 'S9', 'S8', 'S7', 'S6',
    'S5', 'S4', 'S3'
]

const explodingKittenCardSet = {
     // roundUp(players*count/6)
    "specialDefuse": {
        count: 1,
        id: "SD"
    },
    "specialBomb": {
        count: 1,
        id: "SB"
    }
}

class session {
    constructor(roomId, hostIP) {
        this.started = false;
        this.roomId = roomId;
        this.hostIP = hostIP;
        this.players[hostIP] = {cardSet: []};
        this.cardSet = [];
    }
    addPlayer(playerIP) {
        if (this.started) {
            return false
        }
        this.players[playerIP] = {cardSet: []};
        return true;
    }
    dealCard() {
        while (this.cardSet.length) {
            for (let i in this.players) {
                this.players[i].cardSet.splice(Math.floor(Math.random()*this.cardSet.length),1);
            }
        }
    }
    start() {
        this.started = true;
    }
}

class standardSession extends session {
    constructor(roomId, hostIP) {
        super(roomId, hostIP);
        this.cardSet = standardCardSet;
    }
}

class explodingKittenSession extends session {
    constructor(roomId, hostIP) {
        super(roomId, hostIP);
    }
}

module.exports = {session, standardSession, standardCardSet}