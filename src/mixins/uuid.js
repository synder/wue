export default {
  created () {
    this.uuid = Math.random().toString(36).substring(3, 8) +  Math.random().toString(36).substring(3, 8);
  }
}
