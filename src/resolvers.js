const { db } = require('../firebase');
const { collection, addDoc, getDocs, doc, updateDoc, getDoc } = require('@firebase/firestore');



const usersCollection = collection(db, 'users');
const farmsCollection = collection(db, 'farms');

const resolvers = {
  Query: {
    
    async getUser(_, { userId }) {
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (!userSnapshot.exists()) {
        throw new Error('User not found');
      }
      return { userId: userSnapshot.id, ...userSnapshot.data() };
    },
    async getUsers() {
      const querySnapshot = await getDocs(usersCollection);
      return querySnapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
    },
    async getFarm(_, { farmId }) {
      const farmRef = doc(db, 'farms', farmId);
      const farmSnapshot = await getDoc(farmRef);
      if (!farmSnapshot.exists()) {
        throw new Error('Farm not found');
      }
      return { farmId: farmSnapshot.id, ...farmSnapshot.data() };
    },
    async getFarms() {
      const querySnapshot = await getDocs(farmsCollection);
      return querySnapshot.docs.map(doc => ({ farmId: doc.id, ...doc.data() }));
    },
    async getFarmsByUserId(_, { userId }) {
      const userFarmsQuery = query(farmsCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(userFarmsQuery);
      return querySnapshot.docs.map(doc => ({ farmId: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    async createUser(_, { input }) {
      const newUser = {
        ...input,
        dateCreated: new Date().toISOString(),
      };
      const userDocRef = await addDoc(usersCollection, newUser);
      return { userId: userDocRef.id, ...newUser };
    },
    async updateUser(_, { userId, input }) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, input);
      const updatedUserSnapshot = await getDoc(userRef);
      return { userId: updatedUserSnapshot.id, ...updatedUserSnapshot.data() };
    },
    async createFarm(_, { input }) {
      const newFarm = {
        ...input,
        dateCreated: new Date().toISOString(),
      };
      const farmDocRef = await addDoc(farmsCollection, newFarm);
      return { farmId: farmDocRef.id, ...newFarm };
    },
    
    async updateFarm(_, { farmId, input }) {
      const farmRef = doc(db, 'farms', farmId);
      await updateDoc(farmRef, input);
      const updatedFarmSnapshot = await getDoc(farmRef);
      return { farmId: updatedFarmSnapshot.id, ...updatedFarmSnapshot.data() };
    },
    async updateFarm(_, { farmId, input }) {
      const farmRef = doc(db, 'farms', farmId);
      await updateDoc(farmRef, input);
      const updatedFarmSnapshot = await getDoc(farmRef);
      return { farmId: updatedFarmSnapshot.id, ...updatedFarmSnapshot.data() };
    },
  },
 
};

module.exports = resolvers;
