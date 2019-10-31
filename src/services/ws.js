import { DEBUG } from '../config/settings';

const wsHost = DEBUG ? "ws://localhost:8080/ws/" : "wss://domos.icu/ws/";

export default wsHost;