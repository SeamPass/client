# Stage 1: Build the React application
FROM node:20 AS build

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and yarn.lock (if available)
COPY package.json yarn.lock ./

# Install all the dependencies
RUN yarn install

# Copy the rest of your app's source code from your host to your app container
COPY . .

# Build the application with Vite
RUN yarn build

# Stage 2: Serve the application using a lightweight node server
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Install 'serve' to serve the application on port 3000
RUN yarn global add serve

# Set a default value for the PORT environment variable
ENV PORT=3000


# Copy the build directory from the build stage to the current stage
# Replace 'dist' with the appropriate directory if Vite is configured to output to a different directory
COPY --from=build /app/dist /app

# Expose the port the app runs on
EXPOSE $PORT

# Serve the application on port 3000
CMD ["sh", "-c", "serve -s build -l tcp://0.0.0.0:${PORT:-3000}"]


