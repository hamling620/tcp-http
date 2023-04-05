const argv = {}
const args = process.argv
for (let i = 2; i < args.length; i++) {
  const value = args[i]
  if (value.startsWith('--')) {
    argv[value.slice(2)] = args[++i]
  }
}

module.exports = {
  argv
}
