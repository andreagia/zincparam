package org.cirmmp.zincparam.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class Retpdb {
    private List<String> pdbin;
    private List<String> pdbout;
    private List<String> infoout;
    private int exitcode;
}
