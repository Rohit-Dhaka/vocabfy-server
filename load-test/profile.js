import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 250 },
    { duration: "30s", target: 500 },
    { duration: "30s", target: 750 },
    { duration: "30s", target: 1000 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  const res = http.patch(
    "http://localhost:3000/api/user/profile",
    {
      headers: {
        Authorization: `Bearer ${__ENV.ACCESS_TOKEN}`,
      },
    }
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}

// "C:\Program Files\k6\k6.exe" run -e ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTZkZjA0Y2NiMzcyYzZhYzZlZjY1ZiIsImlhdCI6MTc4ODI3NTI4OSwiZXhwIjoxNzg4ODgwMDg5fQ.744pv119-6fOiDiXiv2QATvzTBn8X-XDr9H9NkjFT8s" load-test/profile.js