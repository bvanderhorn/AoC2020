import * as h from '../helpers';
var isValidField = (field: string[]) : boolean => {
    return field[0] == "byr" && +field[1] >= 1920 && +field[1] <= 2002 ||
        field[0] == "iyr" && +field[1] >= 2010 && +field[1] <= 2020 ||
        field[0] == "eyr" && +field[1] >= 2020 && +field[1] <= 2030 ||
        field[0] == "hgt" && (field[1].endsWith("cm") && +field[1].slice(0, -2) >= 150 && +field[1].slice(0, -2) <= 193 || 
                              field[1].endsWith("in") && +field[1].slice(0, -2) >= 59 && +field[1].slice(0, -2) <= 76 ) ||
        field[0] == "hcl" && field[1].match(/^#[0-9a-f]{6}$/) != null ||
        field[0] == "ecl" && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(field[1]) != -1 ||
        field[0] == "pid" && field[1].match(/^[0-9]{9}$/) != null ||
        field[0] == "cid";
}
var containsNecessaryFields = (passport: string[][], necessaryFields: string[]) : boolean => necessaryFields.filter(f => passport.map(q => q[0]).indexOf(f) == -1).length == 0;
var passports = h.read(4, "passports.txt").map(p => p.join(" ")).split(" ").split(":");
h.print(passports.slice(0,2));
var necessaryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
h.print("part 1: " + passports.filter(p => containsNecessaryFields(p, necessaryFields)).length);
h.print("part 2: " + passports.filter(p => containsNecessaryFields(p, necessaryFields)).filter(p => p.filter(f => !isValidField(f)).length == 0).length);