import { describe, expect, it } from "vitest";
import { TodoItem } from "./TodoItem";

// ─────────────────────────────────────────────
// このファイルだけ AAA の「見本」が入っています（書き方の参考用）。
// 見本を真似て、テストケースは自分で考えて書いていきましょう。
// テスト観点のヒント: 正常系 / 異常系 / 境界値 / 特殊値(null・完了済み など)。
// `just cov` の赤い行・分岐を手がかりに、緑に塗っていく。
// ─────────────────────────────────────────────

describe("TodoItem", () => {
  it("見本1: 既定では未完了(done=false)", () => {
    // Arrange
    const item = new TodoItem({ id: "1", title: "牛乳を買う" });

    // Act
    const done = item.done;

    // Assert
    expect(done).toBe(false);
  });

  it("見本2: toggle すると done が反転する", () => {
    // Arrange
    const item = new TodoItem({ id: "1", title: "x" });

    // Act
    item.toggle();

    // Assert
    expect(item.done).toBe(true);
  });

  // ここから先は自分で考えて追加しよう。
  // 本体 (TodoItem.ts) を読み、まだテストされていないメソッド
  // (isOverdue / priorityWeight など) を観点別にテストする。


   it("isOverdue: 期限が過去ならtrue", () => {
    // Arrange
    const item = new TodoItem({
      id: "1",
      title: "x",
      dueDate: new Date("2020-01-01"),
    });
    const now = new Date("2024-01-01");
    // Act
    const result = item.isOverdue(now);
    // Assert
    expect(result).toBe(true);
  });

  it("isOverdue: 完了済みなら期限が過去でもfalse", () => {
    // Arrange
    const item = new TodoItem({
      id: "1",
      title: "x",
      done: true,  
      dueDate: new Date("2020-01-01"),
    });
    const now = new Date("2024-01-01");
    // Act
    const result = item.isOverdue(now);
    // Assert
    expect(result).toBe(false);
  });

   it("isOverdue: 期限なしならfalse", () => {
    const item = new TodoItem({
      id: "1",
      title: "x",
      dueDate: null,
    });
    const now = new Date("2024-01-01");
    // Act
    const result = item.isOverdue(now);
    // Assert
    expect(result).toBe(false);
  });


});
