let wait = time => new Promise(resolve => setTimeout(resolve, time || 0));

export default wait;
