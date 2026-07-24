import { describe, expect, it } from "vitest";
import { SortStrategy } from "./SortStrategy";
import { TodoItem } from "./TodoItem";
// テスト観点のヒント（具体的なケースは自分で考えて洗い出そう）:
//   - 正常系: 各並び替えキーで期待どおりの順序になるか
//   - 境界値: 0件・1件・同値が並ぶ など「境目」
//   - 特殊値: 期限なし(null) が混ざるとどうなるか / 昇順・降順
// 進め方: 本体 (SortStrategy.ts) を読み、`just cov` の赤い行・分岐を手がかりに、
//         観点ごとの it(...) を自分で起こそう。書き方の見本は TodoItem.test.ts。
describe("SortStrategy", () => {
 it("sort: createdキーで作成日時が早い順", () => {
  // Arrange
  const s = new SortStrategy();
  const items = [
    new TodoItem({ id: "1", title: "b", createdAt: new Date("2024-02-01") }),
    new TodoItem({ id: "2", title: "a", createdAt: new Date("2024-01-01") }),
  ];

  // Act
  const result = s.sort(items, "created");

  // Assert
  expect(result.map((i) => i.id)).toEqual(["2", "1"]);
});

it("sort: 空配列なら空で返ってくる", () => {
 // Arrange
  const s = new SortStrategy();
  const items: TodoItem[] = [];

  // Act
  const result = s.sort(items, "created");

  // Assert
  expect(result).toEqual([]);
});

it("sort: 未知のキーを渡すと例外", () => {
  // Arrange
  const s = new SortStrategy();
  const items = [
    new TodoItem({ id: "1", title: "a" }),
    new TodoItem({ id: "2", title: "b" }),
  ];
  const invalidKey = "invalid" as any;

  // Act
  const act = () => s.sort(items, invalidKey);

  // Assert
  expect(act).toThrow();
});

});
