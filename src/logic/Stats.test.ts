import { describe, expect, it } from "vitest";
import { Stats } from "./Stats";
import { TodoItem } from "./TodoItem";

// テスト観点のヒント（具体的なケースは自分で考えて洗い出そう）:
//   - 正常系: 期待どおりの集計結果になるか
//   - 境界値: 0件（空リスト）・全件完了・全件未完了 など「境目」
//   - 特殊値: 期限切れが混ざるとどうなるか
// 進め方: 本体 (Stats.ts) を読み、`just cov` の赤い行・分岐を手がかりに、
//         観点ごとの it(...) を自分で起こそう。書き方の見本は TodoItem.test.ts。
describe("Stats", () => {

  it("completionRate: 空リストなら0", () => {
  // Arrange
  const s = new Stats();
  const items: TodoItem[] = [];

  // Act
  const rate = s.completionRate(items);

  // Assert
  expect(rate).toBe(0);
});

it("completionRate: 4件中1件完了25%", () => {
  // Arrange
  const s = new Stats();
  const items = [
    new TodoItem({ id: "1", title: "a", done: true }),
    new TodoItem({ id: "2", title: "b" }),
    new TodoItem({ id: "3", title: "c" }),
    new TodoItem({ id: "4", title: "d" }),
  ];

  // Act
  const rate = s.completionRate(items);

  // Assert
  expect(rate).toBe(0.25);
});


it("completionRate: すべて完了", () => {
  // Arrange
  const s = new Stats();
  const items = [
    new TodoItem({ id: "1", title: "a", done: true }),
    new TodoItem({ id: "2", title: "b", done: true }),
    new TodoItem({ id: "3", title: "c", done: true }),
    new TodoItem({ id: "4", title: "d", done: true }),
  ];

  // Act
  const rate = s.completionRate(items);

  // Assert
  expect(rate).toBe(1);
});

it("remaining: 4件中1件完了なら残り3件", () => {
  // Arrange
  const s = new Stats();
  const items = [
    new TodoItem({ id: "1", title: "a", done: true }),
    new TodoItem({ id: "2", title: "b" }),
    new TodoItem({ id: "3", title: "c" }),
    new TodoItem({ id: "4", title: "d" }),
  ];

  // Act
  const result = s.remaining(items);

  // Assert
  expect(result).toBe(3);
});

it("overdueCount: 期限切れの件数", () => {
  // Arrange
  const s = new Stats();
  const items = [
    new TodoItem({ id: "1", title: "overdue", dueDate: new Date("2020-01-01") }),      // 期限切れ
    new TodoItem({ id: "2", title: "future", dueDate: new Date("2030-01-01") }),       // 期限内
    new TodoItem({ id: "3", title: "no due", dueDate: null }),  
  ];
  const now = new Date("2024-01-01");

  // Act
  const result = s.overdueCount(items,now);

  // Assert
  expect(result).toBe(1);
});

});
