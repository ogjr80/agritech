const { db } = require('../firebase');
const { collection, addDoc, getDocs, doc, updateDoc, getDoc,query, where } = require('@firebase/firestore');



const usersCollection = collection(db, 'users');
const farmsCollection = collection(db, 'farms');
const cropsCollection = collection(db, "crops");
const livestockCollection = collection(db, "livestock");
const weatherDataCollection = collection(db, "weatherData");
const iotDevicesCollection = collection(db, "iotDevices");

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
    async getCrop(_, { cropId }) {
      const cropRef = doc(db, "crops", cropId);
      const cropSnapshot = await getDoc(cropRef);
      if (!cropSnapshot.exists()) {
        throw new Error("Crop not found");
      }
      return { cropId: cropSnapshot.id, ...cropSnapshot.data() };
    },

    async getCrops() {
      const querySnapshot = await getDocs(cropsCollection);
      return querySnapshot.docs.map((doc) => ({
        cropId: doc.id,
        ...doc.data(),
      }));
    },
    async getIoTDevice(_, { deviceId }) {
      const iotDeviceRef = doc(db, "iotDevices", deviceId);
      const iotDeviceSnapshot = await getDoc(iotDeviceRef);
      if (!iotDeviceSnapshot.exists()) {
        throw new Error("IoT device not found");
      }
      return { deviceId: iotDeviceSnapshot.id, ...iotDeviceSnapshot.data() };
    },

    async getAllIoTDevices() {
      const querySnapshot = await getDocs(iotDevicesCollection);
      return querySnapshot.docs.map((doc) => ({
        deviceId: doc.id,
        ...doc.data(),
      }));
    },

    async getIoTDevicesByFarmId(_, { farmId }) {
      const farmIoTDevicesQuery = query(
        iotDevicesCollection,
        where("farmId", "==", farmId)
      );
      const querySnapshot = await getDocs(farmIoTDevicesQuery);
      return querySnapshot.docs.map((doc) => ({
        deviceId: doc.id,
        ...doc.data(),
      }));
    },
    async getLivestock(_, { livestockId }) {
      const livestockRef = doc(db, "livestock", livestockId);
      const livestockSnapshot = await getDoc(livestockRef);
      if (!livestockSnapshot.exists()) {
        throw new Error("Livestock not found");
      }
      return { livestockId: livestockSnapshot.id, ...livestockSnapshot.data() };
    },

    async getAllLivestock() {
      const querySnapshot = await getDocs(livestockCollection);
      return querySnapshot.docs.map((doc) => ({
        livestockId: doc.id,
        ...doc.data(),
      }));
    },

    async getLivestockByFarmId(_, { farmId }) {
      const farmLivestockQuery = query(
        livestockCollection,
        where("farmId", "==", farmId)
      );
      const querySnapshot = await getDocs(farmLivestockQuery);
      return querySnapshot.docs.map((doc) => ({
        livestockId: doc.id,
        ...doc.data(),
      }));
    },

    async getCropsByFarmId(_, { farmId }) {
      const farmCropsQuery = query(
        cropsCollection,
        where("farmId", "==", farmId)
      );
      const querySnapshot = await getDocs(farmCropsQuery);
      return querySnapshot.docs.map((doc) => ({
        cropId: doc.id,
        ...doc.data(),
      }));
    },
    
    async getWeatherData(_, { weatherDataId }) {
      const weatherDataRef = doc(db, "weatherData", weatherDataId);
      const weatherDataSnapshot = await getDoc(weatherDataRef);
      if (!weatherDataSnapshot.exists()) {
        throw new Error("Weather data not found");
      }
      return { weatherDataId: weatherDataSnapshot.id, ...weatherDataSnapshot.data() };
    },

    async getAllWeatherData() {
      const querySnapshot = await getDocs(weatherDataCollection);
      return querySnapshot.docs.map((doc) => ({
        weatherDataId: doc.id,
        ...doc.data(),
      }));
    },

    async getWeatherDataByFarmId(_, { farmId }) {
      const farmWeatherDataQuery = query(
        weatherDataCollection,
        where("farmId", "==", farmId)
      );
      const querySnapshot = await getDocs(farmWeatherDataQuery);
      return querySnapshot.docs.map((doc) => ({
        weatherDataId: doc.id,
        ...doc.data(),
      }));
    },
  },
  User: {
    async farms(parent) {
      const userFarmsQuery = query(
        farmsCollection,
        where("userId", "==", parent.userId)
      );
      const querySnapshot = await getDocs(userFarmsQuery);
      return querySnapshot.docs.map((doc) => ({
        farmId: doc.id,
        ...doc.data(),
      }));
    },
  },
  Farm: {
    async weatherData(parent) {
      const farmWeatherDataQuery = query(
        weatherDataCollection,
        where("farmId", "==", parent.farmId)
      );
      const querySnapshot = await getDocs(farmWeatherDataQuery);
      return querySnapshot.docs.map((doc) => ({
        weatherDataId: doc.id,
        ...doc.data(),
      }));
    },
    
    async iotDevices(parent) {
      const farmIoTDevicesQuery = query(
        iotDevicesCollection,
        where("farmId", "==", parent.farmId)
      );
      const querySnapshot = await getDocs(farmIoTDevicesQuery);
      return querySnapshot.docs.map((doc) => ({
        deviceId: doc.id,
        ...doc.data(),
      }));
    },
    async crops(parent) {
      const farmCropsQuery = query(
        cropsCollection,
        where("farmId", "==", parent.farmId)
      );
      const querySnapshot = await getDocs(farmCropsQuery);
      return querySnapshot.docs.map((doc) => ({
        cropId: doc.id,
        ...doc.data(),
      }));
    },
    async livestocks(parent) {
      const farmLivestockQuery = query(
        livestockCollection,
        where("farmId", "==", parent.farmId)
      );
      const querySnapshot = await getDocs(farmLivestockQuery);
      return querySnapshot.docs.map((doc) => ({
        livestockId: doc.id,
        ...doc.data(),
      }));
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
    async createLivestock(_, { input }) {
      const newLivestock = {
        ...input,
        dateCreated: new Date().toISOString(),
      };
      const livestockDocRef = await addDoc(livestockCollection, newLivestock);
      return { livestockId: livestockDocRef.id, ...newLivestock };
    },

    async updateLivestock(_, { livestockId, input }) {
      const livestockRef = doc(db, "livestock", livestockId);
      await updateDoc(livestockRef, input);
      const updatedLivestockSnapshot = await getDoc(livestockRef);
      return { livestockId: updatedLivestockSnapshot.id, ...updatedLivestockSnapshot.data() };
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
    async createWeatherData(_, { input }) {
      const newWeatherData = {
        ...input,
      };
      const weatherDataDocRef = await addDoc(weatherDataCollection, newWeatherData);
      return { weatherDataId: weatherDataDocRef.id, ...newWeatherData };
    },

    async updateWeatherData(_, { weatherDataId, input }) {
      const weatherDataRef = doc(db, "weatherData", weatherDataId);
      await updateDoc(weatherDataRef, input);
      const updatedWeatherDataSnapshot = await getDoc(weatherDataRef);
      return { weatherDataId: updatedWeatherDataSnapshot.id, ...updatedWeatherDataSnapshot.data() };
    },
    async createCrop(_, { input }) {
      const newCrop = {
        ...input,
        dateCreated: new Date().toISOString(),
      };
      const cropDocRef = await addDoc(cropsCollection, newCrop);
      return { cropId: cropDocRef.id, ...newCrop };
    },
    async updateCrop(_, { cropId, input }) {
      const cropRef = doc(db, "crops", cropId);
      await updateDoc(cropRef, input);
      const updatedCropSnapshot = await getDoc(cropRef);
      return { cropId: updatedCropSnapshot.id, ...updatedCropSnapshot.data() };
    },
    async createIoTDevice(_, { input }) {
      const newIoTDevice = {
        ...input,
        lastUpdated: new Date().toISOString(),
      };
      const iotDeviceDocRef = await addDoc(iotDevicesCollection, newIoTDevice);
      return { deviceId: iotDeviceDocRef.id, ...newIoTDevice };
    },
    
    async updateIoTDevice(_, { deviceId, input }) {
      const iotDeviceRef = doc(db, "iotDevices", deviceId);
      await updateDoc(iotDeviceRef, { ...input, lastUpdated: new Date().toISOString() });
      const updatedIoTDeviceSnapshot = await getDoc(iotDeviceRef);
      return { deviceId: updatedIoTDeviceSnapshot.id, ...updatedIoTDeviceSnapshot.data() };
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




