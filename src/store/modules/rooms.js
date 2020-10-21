import { db, server } from "../../db";

// initial state
const state = {
  rooms: []
};

// getters
const getters = {
  rooms: state => state.rooms
};

// actions
const actions = {
  async addRoom(_, payload) {
    const roomRef = db.collection('users').doc(payload.user.uid).collection('rooms');
    await roomRef.add({
        name: payload.roomName,
        createdAt: server.FieldValue.serverTimestamp(),
    })
  },
  getRooms({ commit }, payload) {
    const roomRef = db.collection('users').doc(payload.user.uid).collection('rooms');
    roomRef.onSnapshot(snapshot => {
      const snapData = [];
      snapshot.forEach(doc => {
        snapData.push({
          id: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
        })
      });
      snapData.sort((a, b) => {
        return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1 
      })
      commit("GETROOMS", snapData);
    }); 
  },
};

// mutations
const mutations = {
  GETROOMS(state, payload) {
    state.rooms = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
