function sum(a: number, b: number) {
  return a + b;
}

console.log(process.env.CI);

test("summing bird", () => {
  expect(sum(1, 2)).toBe(3);
});
