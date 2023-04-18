Below is a comprehensive documentation for all the implemented models, including their fields and GraphQL operations.

Models
User
Fields:

userId: Unique identifier for the user
email: User's email address
displayName: User's display name
profileImageURL: (Optional) URL of the user's profile image
role: The user's role (e.g., farmer, agronomist, researcher, etc.)
dateCreated: Timestamp of when the user was created
Farm
Fields:

farmId: Unique identifier for the farm
userId: Identifier for the owner of the farm
name: Name of the farm
location: Geographical location of the farm, represented by latitude and longitude
size: Size of the farm in hectares or acres
description: (Optional) Description of the farm
dateCreated: Timestamp of when the farm was created
Crops: List of crops associated with the farm
iotDevices: List of IoT devices associated with the farm
Crop
Fields:

cropId: Unique identifier for the crop
farmId: Identifier for the associated farm
userId: Identifier for the owner of the crop
type: Type of the crop (e.g., wheat, corn, etc.)
stage: Growth stage of the crop (e.g., germination, flowering, harvest, etc.)
plantingDate: Date when the crop was planted
harvestDate: (Optional) Date when the crop is expected to be harvested
healthStatus: Health status of the crop
dateCreated: Timestamp of when the crop was created
Livestock
Fields:

livestockId: Unique identifier for the livestock
farmId: Identifier for the associated farm
userId: Identifier for the owner of the livestock
type: Type of the livestock (e.g., cattle, sheep, etc.)
quantity: Number of livestock in the group
healthStatus: Health status of the livestock
location: (Optional) Geographical location of the livestock, represented by latitude and longitude
dateCreated: Timestamp of when the livestock was created
WeatherData
Fields:

weatherDataId: Unique identifier for the weather data
farmId: Identifier for the associated farm
date: Date when the weather data was recorded
temperature: Temperature in degrees Celsius
humidity: Humidity level in percentage
rainfall: Rainfall in millimeters
windSpeed: Wind speed in kilometers per hour
IoTDevices
Fields:

deviceId: Unique identifier for the IoT device
userId: Identifier for the owner of the device
farmId: Identifier for the associated farm
type: Type of the IoT device (e.g., soil moisture sensor, weather station, etc.)
location: Geographical location of the IoT device, represented by latitude and longitude
data: Nested structure with device-specific data
lastUpdated: Timestamp of when the IoT device was last updated
GraphQL Operations
Queries
getUser(userId: ID!): Fetch a user by their userId
getUsers: Fetch all users
getFarm(farmId: ID!): Fetch a farm by its farmId
getFarms: Fetch all farms
getFarmsByUserId(userId: ID!): Fetch all farms owned by a specific user
getCrop(cropId: ID!): Fetch a crop by its cropId

getCrops: Fetch all crops
getLivestock(livestockId: ID!): Fetch a livestock by its livestockId
getLivestocks: Fetch all livestock
getWeatherData(weatherDataId: ID!): Fetch weather data by its weatherDataId
getWeatherDatas: Fetch all weather data records
getIoTDevice(deviceId: ID!): Fetch an IoT device by its deviceId
getIoTDevices: Fetch all IoT devices
Mutations
createUser(input: CreateUserInput!): Create a new user
updateUser(userId: ID!, input: UpdateUserInput!): Update an existing user
createFarm(input: CreateFarmInput!): Create a new farm
updateFarm(farmId: ID!, input: UpdateFarmInput!): Update an existing farm
createCrop(input: CreateCropInput!): Create a new crop
updateCrop(cropId: ID!, input: UpdateCropInput!): Update an existing crop
createLivestock(input: CreateLivestockInput!): Create a new livestock
updateLivestock(livestockId: ID!, input: UpdateLivestockInput!): Update an existing livestock
createWeatherData(input: CreateWeatherDataInput!): Create a new weather data record
updateWeatherData(weatherDataId: ID!, input: UpdateWeatherDataInput!): Update an existing weather data record
createIoTDevice(input: CreateIoTDeviceInput!): Create a new IoT device
updateIoTDevice(deviceId: ID!, input: UpdateIoTDeviceInput!): Update an existing IoT device
This documentation covers all the models and their fields, as well as the available GraphQL operations (queries and mutations) for each model.