import * as h from '../helpers';
var passports = h.read(4, "passports.txt").map(p => p.join(" ")).split(" ").split(":");
h.print(passports.slice(0,2));
var fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
var missingFields = passports.map(p => fields.filter(f => p.map(q => q[0]).indexOf(f) == -1));
h.print("part 1: " + missingFields.filter(m => (m.length == 1 && m[0] == "cid") || m.length == 0).length);