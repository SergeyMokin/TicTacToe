export default class Winners
{
    constructor(self)
    {
        this.self = self;
    }

    winCombinations = [
        () => this.self.refs["1x1"].textContent === this.self.refs["1x2"].textContent 
            && this.self.refs["1x1"].textContent === this.self.refs["1x3"].textContent
            && this.self.refs["1x1"].textContent !== ""
            && this.self.refs["1x2"].textContent !== ""
            && this.self.refs["1x3"].textContent !== "", 
        () => this.self.refs["1x1"].textContent === this.self.refs["2x1"].textContent
            && this.self.refs["1x1"].textContent === this.self.refs["3x1"].textContent
            && this.self.refs["1x1"].textContent !== ""
            && this.self.refs["2x1"].textContent !== ""
            && this.self.refs["3x1"].textContent !== "",
        () => this.self.refs["3x1"].textContent === this.self.refs["3x2"].textContent
            && this.self.refs["3x1"].textContent === this.self.refs["3x3"].textContent
            && this.self.refs["3x1"].textContent !== ""
            && this.self.refs["3x2"].textContent !== ""
            && this.self.refs["3x3"].textContent !== "",
        () => this.self.refs["3x3"].textContent === this.self.refs["2x3"].textContent
            && this.self.refs["3x3"].textContent === this.self.refs["1x3"].textContent
            && this.self.refs["3x3"].textContent !== ""
            && this.self.refs["2x3"].textContent !== ""
            && this.self.refs["1x3"].textContent !== "",
        () => this.self.refs["1x2"].textContent === this.self.refs["2x2"].textContent
            && this.self.refs["1x2"].textContent === this.self.refs["3x2"].textContent
            && this.self.refs["1x2"].textContent !== ""
            && this.self.refs["2x2"].textContent !== ""
            && this.self.refs["3x2"].textContent !== "",
        () => this.self.refs["2x1"].textContent === this.self.refs["2x2"].textContent
            && this.self.refs["2x1"].textContent === this.self.refs["2x3"].textContent
            && this.self.refs["2x1"].textContent !== ""
            && this.self.refs["2x2"].textContent !== ""
            && this.self.refs["2x3"].textContent !== "",
        () => this.self.refs["1x1"].textContent === this.self.refs["2x2"].textContent
            && this.self.refs["1x1"].textContent === this.self.refs["3x3"].textContent
            && this.self.refs["1x1"].textContent !== ""
            && this.self.refs["2x2"].textContent !== ""
            && this.self.refs["3x3"].textContent !== "",
        () => this.self.refs["1x3"].textContent === this.self.refs["2x2"].textContent
            && this.self.refs["1x3"].textContent === this.self.refs["3x1"].textContent
            && this.self.refs["1x3"].textContent !== ""
            && this.self.refs["2x2"].textContent !== ""
            && this.self.refs["3x1"].textContent !== ""
    ]
} 