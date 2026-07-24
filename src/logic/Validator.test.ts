import { describe, expect, it } from "vitest";
import { Validator } from "./Validator";

// テスト観点のヒント（具体的なケースは自分で考えて洗い出そう）:
//   - 正常系: 期待どおりの入力で正しい結果になるか
//   - 異常系: エラーや NG になる入力はあるか
//   - 境界値: 0件・上限ちょうど・1つ違い など「境目」
//   - 特殊値: null / 空文字 / 空白だけ などの特別な値
// 進め方: 本体 (Validator.ts) を読み、`just cov` の赤い行・分岐を手がかりに、
//         観点ごとの it(...) を自分で起こそう。書き方の見本は TodoItem.test.ts。
describe("Validator", () => {
  it("validateTitle: 通常の文字列ならok=true", () => {
    // Arrange
    const v = new Validator();
    const title = "テスト";

    // Act
    const result = v.validateTitle(title);

    // Assert
    expect(result.ok).toBe(true);
  });

   it("validateTitle: 空文字なら=false", () => {
    // Arrange
    const v = new Validator();
    const title = "";

    // Act
    const result = v.validateTitle(title);

    // Assert
    expect(result.ok).toBe(false);
  });

   it("validateTitle: 境界値100=true", () => {
    // Arrange
    const v = new Validator();
    const title = "あ".repeat(100);

    // Act
    const result = v.validateTitle(title);

    // Assert
    expect(result.ok).toBe(true);
  });

  it("validateTitle: 境界値101=false", () => {
    // Arrange
    const v = new Validator();
    const title = "あ".repeat(101);

    // Act
    const result = v.validateTitle(title);

    // Assert
    expect(result.ok).toBe(false);
  });

  it("validateDueDate: dueDateがnullなら=true", () => {
  // Arrange
  const v = new Validator();
  const dueDate = null;
  const now = new Date("2024-01-01");

  // Act
  const result = v.validateDueDate(dueDate, now);

  // Assert
  expect(result.ok).toBe(true);
});

it("validateDueDate: dueDateが過去なら=false", () => {
  // Arrange
  const v = new Validator();
  const dueDate = new Date("2023-01-01");
  const now = new Date("2024-01-01");

  // Act
  const result = v.validateDueDate(dueDate, now);

  // Assert
  expect(result.ok).toBe(false);
});

it("validateDueDate: dueDateが未来なら=true", () => {
  // Arrange
  const v = new Validator();
  const dueDate = new Date("2025-01-01");
  const now = new Date("2024-01-01");

  // Act
  const result = v.validateDueDate(dueDate, now);

  // Assert
  expect(result.ok).toBe(true);
});
  
});
