# Use the official Node.js image as the base image
FROM node:18-alpine AS build


# Set working directory to /blog inside the container
WORKDIR /blog


# Copy package.json and package-lock.json to the container
COPY package.json ./


# Install the project dependencies
RUN npm install


# Copy the rest of the application code to the container
COPY . .


# Build the React app (which will create the `build` folder in the /blog directory)
RUN npm run build




#########################
# Stage 2: Production Image
#########################


# Use an official Node.js runtime for the final image
FROM node:18-alpine


# Set the working directory for the final image
WORKDIR /app


# Copy the build folder and expressServer folder from the `build` stage to the final image
COPY --from=build /blog/build /app/build
COPY --from=build /blog/expressServer /app/expressServer


# Change directory to the express server folder
WORKDIR /app/expressServer


# Install production dependencies for the express server
RUN npm install --only=prod


# Expose the port on which your Express app listens
EXPOSE 3000


# Start the Express server
CMD ["node", "index.js"]




