import {
  assemblerOptions,
  errorModelOptions,
  markersetOptions,
  normalizationMethodOptions,
  keggcharterTaxaLevelOptions,
  recognizerDatabasesOptions
} from './options'

export const defaultValues = {
    "output":"output",
    "resourcesDirectory":"resources_directory",
    "threads":14,
    "experiments": "experiments.tsv",
    "minimumReadLength":100,
    "minimumReadAverageQuality":20,
    "doAssembly":true,
    "maxMemory":4,
    "assembler":assemblerOptions[0],
    "errorModel":errorModelOptions[0],
    "markerset":markersetOptions[0],
    "diamondDatabase":"resources_directory/uniprot.dmnd",
    "diamondMaxTargetSeqs":1,
    "downloadUniprot":true,
    "downloadCdd":true,
    "uniprotColumns":[
        "id",
        "entry name",
        "genes",
        "protein names",
        "ec",
        "comment(FUNCTION)",
        "comment(PATHWAY)",
        "keywords",
        "existence",
        "go",
        "families",
        "lineage(SUPERKINGDOM)",
        "lineage(PHYLUM)",
        "lineage(CLASS)",
        "lineage(ORDER)",
        "lineage(FAMILY)",
        "lineage(GENUS)",
        "lineage(SPECIES)"
    ],
    "uniprotDatabases":[
        "BioCyc",
        "BRENDA",
        "CDD",
        "eggNOG",
        "Ensembl",
        "InterPro",
        "KEGG",
        "KO",
        "Pfam",
        "Reactome",
        "RefSeq",
        "UniPathway",
        "GO"
    ],
    "recognizerDatabases":recognizerDatabasesOptions,
    "normalizationMethod":normalizationMethodOptions[0],
    "minimumDifferentialExpression":1,
    "keggcharterMaps":[
        "00010",
        "00020",
        "00030",
        "00040",
        "00051",
        "00052",
        "00053",
        "00500",
        "00520",
        "00620",
        "00630",
        "00640",
        "00650",
        "00660",
        "00562",
        "00190",
        "00195",
        "00196",
        "00710",
        "00720",
        "00680",
        "00910",
        "00920",
        "00061",
        "00062",
        "00071",
        "00072",
        "00073",
        "00100",
        "00120",
        "00121",
        "00140",
        "00561",
        "00564",
        "00565",
        "00600",
        "00590",
        "00591",
        "00592",
        "01040",
        "00230",
        "00240",
        "00250",
        "00260",
        "00270",
        "00280",
        "00290",
        "00310",
        "00220",
        "00330",
        "00340",
        "00350",
        "00360",
        "00380",
        "00400",
        "00410",
        "00430",
        "00440",
        "00450",
        "00460",
        "00471",
        "00472",
        "00473",
        "00480",
        "00510",
        "00513",
        "00512",
        "00515",
        "00514",
        "00532",
        "00534",
        "00533",
        "00531",
        "00563",
        "00601",
        "00603",
        "00604",
        "00540",
        "00550",
        "00511",
        "00571",
        "00572",
        "00730",
        "00740",
        "00750",
        "00760",
        "00770",
        "00780",
        "00785",
        "00790",
        "00670",
        "00830",
        "00860",
        "00130",
        "00900",
        "00902",
        "00909",
        "00904",
        "00906",
        "00905",
        "00981",
        "00908",
        "00903",
        "00281",
        "01052",
        "00522",
        "01051",
        "01059",
        "01056",
        "01057",
        "00253",
        "00523",
        "01054",
        "01053",
        "01055",
        "00940",
        "00945",
        "00941",
        "00944",
        "00942",
        "00943",
        "00901",
        "00403",
        "00950",
        "00960",
        "01058",
        "00232",
        "00965",
        "00966",
        "00402",
        "00311",
        "00332",
        "00261",
        "00331",
        "00521",
        "00524",
        "00525",
        "00401",
        "00404",
        "00405",
        "00333",
        "00254",
        "00998",
        "00999",
        "00362",
        "00627",
        "00364",
        "00625",
        "00361",
        "00623",
        "00622",
        "00633",
        "00642",
        "00643",
        "00791",
        "00930",
        "00363",
        "00621",
        "00626",
        "00624",
        "00365",
        "00984",
        "00980",
        "03020",
        "03022",
        "03040",
        "03010",
        "00970",
        "03013",
        "03015",
        "03008",
        "03060",
        "04141",
        "04130",
        "04120",
        "04122",
        "03050",
        "03018",
        "03030",
        "03410",
        "03420",
        "03430",
        "03440",
        "03450",
        "03460",
        "02010",
        "02060",
        "03070",
        "02020",
        "04014",
        "04015",
        "04010",
        "04011",
        "04012",
        "04310",
        "04330",
        "04340",
        "04350",
        "04390",
        "04392",
        "04370",
        "04371",
        "04630",
        "04064",
        "04668",
        "04066",
        "04068",
        "04020",
        "04070",
        "04072",
        "04071",
        "04024",
        "04022",
        "04151",
        "04152",
        "04150",
        "04075",
        "04080",
        "04060",
        "04061",
        "04512",
        "04514",
        "04144",
        "04145",
        "04142",
        "04146",
        "04138",
        "04136",
        "04139",
        "04110",
        "04111",
        "04112",
        "04113",
        "04114",
        "04210",
        "04215",
        "04216",
        "04217",
        "04115",
        "04218",
        "04510",
        "04520",
        "04530",
        "04540",
        "04550",
        "02024",
        "05111",
        "02025",
        "02026",
        "02030",
        "02040",
        "04810"
    ],
    "keggcharterTaxaLevel":keggcharterTaxaLevelOptions[0],
    "keggcharterNumberOfTaxa":10,
    "proteomicsWorkflow":"compomics",
    "useCrap":true,
    "proteomicsContaminantesDatabase":"crap.fasta",
    "referenceProteomesTaxaLevel":"GENUS",
    "protease":"Trypsin",
    "proteaseFile":""
}
