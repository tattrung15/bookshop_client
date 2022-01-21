export class Model {
  id: number;
  fillable?: string[];

  fill(input: any): this {
    if (this.fillable && this.fillable.length) {
      this.fillable.forEach((value) => {
        if (typeof input[value] !== "undefined") {
          this[value] = input[value];
        }
      });
    } else {
      Object.assign(this, input);
    }
    return this;
  }
}
