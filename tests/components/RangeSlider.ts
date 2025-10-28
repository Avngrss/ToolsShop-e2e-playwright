import { Locator, Page } from "@playwright/test";

export class RangeSliderComponent {
  private readonly slider: Locator;
  private readonly minHandle: Locator;
  private readonly maxHandle: Locator;
  private readonly minValueLabel: Locator;
  private readonly maxValueLabel: Locator;
  private readonly maxValue: number = 200; // предполагаемый максимум; можно параметризовать

  constructor(page: Page, sliderSelector: string = "ngx-slider") {
    this.slider = page.locator(sliderSelector);
    this.minHandle = page.locator(
      "span[ngxsliderhandle].ngx-slider-pointer-min"
    );
    this.maxHandle = page.locator(
      "span[ngxsliderhandle].ngx-slider-pointer-max"
    );
    this.minValueLabel = page.locator(
      "span[ngxsliderlabel].ngx-slider-model-value"
    );
    this.maxValueLabel = page.locator(
      "span[ngxsliderlabel].ngx-slider-model-high"
    );
  }

  async getMinValue(): Promise<number> {
    const value = await this.minHandle.getAttribute("aria-valuenow");
    return parseInt(value || "0", 10);
  }

  async getMaxValue(): Promise<number> {
    const value = await this.maxHandle.getAttribute("aria-valuenow");
    return parseInt(value || "0", 10);
  }

  async getMinDisplayValue(): Promise<number> {
    const text = await this.minValueLabel.textContent();
    return parseInt(text?.trim() || "0", 10);
  }

  async getMaxDisplayValue(): Promise<number> {
    const text = await this.maxValueLabel.textContent();
    return parseInt(text?.trim() || "0", 10);
  }

  async setMinValue(targetValue: number): Promise<void> {
    const currentValue = await this.getMinValue();
    if (currentValue === targetValue) return;

    const steps = targetValue - currentValue;
    const key = steps > 0 ? "ArrowRight" : "ArrowLeft";
    const absSteps = Math.abs(steps);

    await this.minHandle.focus();
    const page = this.minHandle.page();

    for (let i = 0; i < absSteps; i++) {
      await page.keyboard.press(key);
    }
  }

  async setMaxValue(targetValue: number): Promise<void> {
    const currentValue = await this.getMaxValue();
    if (currentValue === targetValue) return;

    const steps = targetValue - currentValue;
    const key = steps > 0 ? "ArrowRight" : "ArrowLeft";
    const absSteps = Math.abs(steps);

    await this.maxHandle.focus();
    const page = this.maxHandle.page();

    for (let i = 0; i < absSteps; i++) {
      await page.keyboard.press(key);
    }
  }

  async setRange(minValue: number, maxValue: number): Promise<void> {
    if (minValue > maxValue) {
      throw new Error(
        `minValue (${minValue}) cannot be greater than maxValue (${maxValue})`
      );
    }

    if (minValue === maxValue) {
      const currentMin = await this.getMinValue();
      const currentMax = await this.getMaxValue();
      if (currentMin === minValue && currentMax === maxValue) {
        return;
      }

      await this.setMinValue(0);
      await this.setMaxValue(this.maxValue);

      if (minValue === 0) {
        await this.setMaxValue(0);
        await this.setMinValue(0);
      } else if (minValue === this.maxValue) {
        await this.setMinValue(this.maxValue);
        await this.setMaxValue(this.maxValue);
      } else {
        if (minValue <= currentMin) {
          await this.setMaxValue(minValue);
          await this.setMinValue(minValue);
        } else {
          await this.setMinValue(minValue);
          await this.setMaxValue(minValue);
        }
      }
    } else {
      await this.setMinValue(minValue);
      await this.setMaxValue(maxValue);
    }
  }

  async getRange(): Promise<{ min: number; max: number }> {
    return {
      min: await this.getMinValue(),
      max: await this.getMaxValue(),
    };
  }

  async dragMinHandleToValue(targetValue: number): Promise<void> {
    const maxValue = await this.getMaxValue();
    if (targetValue > maxValue) {
      throw new Error(
        `Min value ${targetValue} cannot exceed max value ${maxValue}`
      );
    }

    const sliderBox = await this.slider.boundingBox();
    if (!sliderBox) {
      throw new Error("Slider bounding box not found");
    }

    const percentage = targetValue / this.maxValue;
    const targetX = sliderBox.x + sliderBox.width * percentage;

    await this.minHandle.hover();
    await this.minHandle.page().mouse.down();
    await this.minHandle
      .page()
      .mouse.move(targetX, sliderBox.y + sliderBox.height / 2);
    await this.minHandle.page().mouse.up();
  }

  async dragMaxHandleToValue(targetValue: number): Promise<void> {
    const minValue = await this.getMinValue();
    if (targetValue < minValue) {
      throw new Error(
        `Max value ${targetValue} cannot be less than min value ${minValue}`
      );
    }

    const sliderBox = await this.slider.boundingBox();
    if (!sliderBox) {
      throw new Error("Slider bounding box not found");
    }

    const percentage = targetValue / this.maxValue;
    const targetX = sliderBox.x + sliderBox.width * percentage;

    await this.maxHandle.hover();
    await this.maxHandle.page().mouse.down();
    await this.maxHandle
      .page()
      .mouse.move(targetX, sliderBox.y + sliderBox.height / 2);
    await this.maxHandle.page().mouse.up();
  }
}
