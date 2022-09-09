const getType = value =>{
    if(value == 'preprocess' || value == 'join_reads' || value == 'fastq2fasta' || value == 'assembly' || value == 'metaphlan'){
        return (['fastq'])
    }if(value == 'annotation'){
        return(['scaffolds', 'piled_piled_fasta'])
    }if(value == 'binning'){
        return(['fastq','scaffolds'])
    }if(value == 'recognizer'){
        return(['fgs'])
    }if(value == 'quantification_analysis'){
        return(['fgs', 'contigs', 'fastq'])
    }if(value == 'protein_report'){
        return(['tsv', 'readcounts'])
    }if(value == 'entry_report' || value == 'keggcharter'){
        return(['xlsx'])
    }if(value == 'differential_expression'){
        return(['tsv'])
    }
}

export default getType