
const dev = {
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-2-api-dev-attachmentsbucket-uama7s68diax"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://6w6ewb1fr7.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_DjQW21clR",
        APP_CLIENT_ID: "787bond2146nf6vctjrubtn8s9",
        IDENTITY_POOL_ID: "us-east-2:ee86b105-4157-45b1-a3ed-c85507ffc4a5"
    },
    STRIPE_KEY: "pk_test_HdfvqGkAAUOc1AOhwL9TNZPJ00qLgpsK3X",
};

const prod = {
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-2-api-prod-attachmentsbucket-8nvhv986xhmf"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://oj97727l5j.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_sLdK5IjjZ",
        APP_CLIENT_ID: "6ltkvq9shenhsv0iupg9m28tum",
        IDENTITY_POOL_ID: "us-east-2:a8ead080-196e-4e45-a31d-63247d3b05c3"
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