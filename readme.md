# Activity Service

## Overview

The Activity Service is responsible for managing activities and activity types for the TourHub application. This service provides RESTful API endpoints to create, read, update, and delete data related to activities.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Activitys](#activities)
  - [Activity Types](#activity-types)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone git@github.com:hasithar/tourhub-activity-service.git`
2. Change directory: `cd tourhub-activity-service`
3. Install dependencies: `npm install`

## Configuration

Use environment variables to configure the service.

1. Copy the env.example file to .env `cp env.example .env`
2. Update the .env file with your specific configuration settings.

## Usage

1. Start the service: `npm start`
2. The service will be running at `http://localhost:3000`.

## API Endpoints

### Activitys

- `GET /api/activities`

  - Fetch all activities.

- `GET /api/activities/:id`

  - Fetch a single activity by ID.

- `POST /api/activities`

  - Create a new activity.

- `PATCH /api/activities/:id`

  - Update an existing activity by ID.

- `DELETE /api/activities/:id`
  - Delete an activity by ID.

### Activity Types

- `GET /api/activity-types`

  - Fetch all activity types.

- `GET /api/activity-types/:id`

  - Fetch a single activity type by ID.

- `POST /api/activity-types`

  - Create a new activity type.

- `PATCH /api/activity-types/:id`

  - Update an existing activity type by ID.

- `DELETE /api/activity-types/:id`
  - Delete an activity type by ID.

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
