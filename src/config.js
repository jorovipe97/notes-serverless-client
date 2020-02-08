const dev = {
    s3: {
        REGION: "us-east-2",
        BUCKET: "experts-todolist-1-dev-attachmentsbucket-eq5nh1dem5qm"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://s78ivpyjbl.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_UFYtKYRit",
        APP_CLIENT_ID: "1ivov8t47d4bsq4s04m2q4a8ta",
        IDENTITY_POOL_ID: "us-east-2:8f54a541-2e8d-4953-a882-436ae8c5b82f"
    },
    STRIPE_KEY: "pk_test_HdfvqGkAAUOc1AOhwL9TNZPJ00qLgpsK3X",
};

const prod = {
    s3: {
        REGION: "us-east-2",
        BUCKET: "experts-todolist-1-prod-attachmentsbucket-6ab3jky2ign1"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://rijpbip536.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_anWp29IK2",
        APP_CLIENT_ID: "2ajsfcqfrnmconcuqu8370arkd",
        IDENTITY_POOL_ID: "us-east-2:c84e1f4b-96a2-48c1-a901-e0d420b692e6"
    },
    STRIPE_KEY: "pk_test_HdfvqGkAAUOc1AOhwL9TNZPJ00qLgpsK3X",
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
console.log('env:', process.env.REACT_APP_STAGE);
export default {
    MAX_ATTACHMENT_SIZE: 5000000, // 5 mb
    ...config
};